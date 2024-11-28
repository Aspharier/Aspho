import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  LayoutAnimation,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import { AudioContext } from "./context/AudioProvider";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import AudioList from "./components/AudioList";
import Screen from "./components/screen";
import OptionModel from "./components/OptionModel";
export default class Music extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };
    this.currentItem = {}
  }

  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  rowRenderer = (type, item) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <AudioList
          title={item.filename}
          duration={item.duration}
          onOptionPress={() => {
            this.currentItem = item;
            this.setState({ ...this.state, optionModalVisible: true });
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen>
              <StatusBar barStyle="dark-content" backgroundColor="white" />
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModel
              onPlayPress={() => console.log('Playing audio')}
              onPlaylistPress={() => console.log('Playlist added')}
              currentItem = {this.currentItem}
                onclose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                visible={this.state.optionModalVisible}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttonText: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 35,
    color: "#0B090A",
  },
  searchButton: {
    marginRight: 10,
    marginLeft: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3F4",
    elevation: 30,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

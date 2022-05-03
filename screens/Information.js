import React, { useEffect, useState } from "react";
import { Text, ScrollView, ImageBackground, View, Image } from "react-native";
import {
  Provider as PaperProvider,
  useTheme,
  List,
  Divider,
  Button,
} from "react-native-paper";
import styles from "../styles/styles";
import theme from "../styles/Theme";

export default function Information({ navigation }) {
  const { colors } = useTheme(theme);

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <View style={{ margin: 16 }}>
          <Text
            style={[
              styles.textAccordion,
              { alignSelf: "center", paddingBottom: 4 },
            ]}
          >
            About me
          </Text>
          <View style={styles.flexContainer}>
            <Text style={[styles.textMediumBody, { flex: 3 }]}>
              My name is Thorsten and I have been a passionate runner for many
              years. For me, running is not just a sport, but a way of life and
              part of my identity. The idea for the runner radio came to me
              while I was running.
            </Text>
            <View style={{ flex: 1, padding: 4 }}>
              <Image
                source={require("../assets/images/AboutMe.png")}
                style={{ width: 90, height: 90 }}
              />
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.textAccordion,
              { alignSelf: "center", paddingBottom: 4 },
            ]}
          >
            Running formats
          </Text>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/VirtualRunningMeeting.png")}
              style={styles.runsImg}
            >
              <Text
                style={[
                  styles.runsHeader,
                  { width: 100, marginLeft: 3, marginTop: 58 },
                ]}
              >
                Virtual Running Meeting
              </Text>
              <Text style={[styles.runsBody, { width: 200, marginTop: 15 }]}>
                We get in the mood for 10 minutes in the “Virtual Starting
                Block” before we start a 60 minute run together. Appropriate
                music accompanies the different phases (warm-up, main phase,
                cool-down) before we end the run briefly in the finisher zone.
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/BeachRun.png")}
              style={styles.runsImg}
            >
              <Text style={[styles.runsHeader, { margin: 30 }]}>Beach Run</Text>
              <Text style={[styles.runsBody, { width: 180, marginTop: 10 }]}>
                The perfect start to the day, whether you're running, lying on
                the couch or having your first to fifth coffee/tea. Calm,
                relaxed music accompanies us for 45 minutes and inbetween we
                hear the sound of the sea again and again.
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/OneBookOneRun.png")}
              style={styles.runsImg}
            >
              <Text
                style={[
                  styles.runsHeader,
                  { width: 80, marginLeft: 3, marginTop: 39 },
                ]}
              >
                One Run, One Book
              </Text>
              <Text
                style={[
                  styles.runsBody,
                  { width: 200, marginTop: 30, marginRight: 10 },
                ]}
              >
                The run that not only helps you in terms of sport. Suitable
                music for running and in between listening to the summary of an
                interesting book. 60 minutes just flew by.
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/FeelTheBeat.png")}
              style={styles.runsImg}
            >
              <Text style={[styles.runsHeader, { marginLeft: 10 }]}>
                Feel The Beat
              </Text>
              <Text style={[styles.runsBody, { width: 180 }]}>
                Just let the tempo of the songs guide you in this musical
                driving game. But manage your strength well during the 45
                minutes, you don't know exactly how long the stress and rest
                phases are.
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/LongRun.png")}
              style={styles.runsImg}
            >
              <Text
                style={[styles.runsHeader, { marginTop: 35, marginLeft: 10 }]}
              >
                Long Run
              </Text>
              <Text style={[styles.runsBody, { width: 130, marginRight: 105 }]}>
                Here you can chat about various topics with interesting
                interview guests. Of course, motivating music should not be
                missing during the long run. How long is this? May vary, but at
                least 1.5 hours.
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.runsContainer}>
            <ImageBackground
              source={require("../assets/images/SpecialOffer.png")}
              style={styles.runsImg}
            >
              <Text style={[styles.runsHeader, { marginLeft: 10 }]}>
                Special Offers
              </Text>
              <Text
                style={[
                  styles.runsBody,
                  { width: 150, marginTop: 140, marginRight: 60 },
                ]}
              >
                Can be anything: from a running party to surprise runs. As
                diverse as running.
              </Text>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

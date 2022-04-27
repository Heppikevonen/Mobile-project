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
        <View>
          <Text style={styles.textAccordion}>About me</Text>
          <Text style={styles.textMediumBody}>
            My name is Thorsten and I have been a passionate runner for many
            years. For me, running is not just a sport, but a way of life and
            part of my identity. The idea for the runner radio came to me while
            I was running.
          </Text>
          <Image source={require("../assets/images/AboutMe.png")} style={{width: 132, height: 132}}/>
        </View>
        <View>
          <Text style={styles.textAccordion}>Running formats</Text>
          <View>
            <ImageBackground
              source={require("../assets/images/VirtualRunningMeeting.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>Virtual Running Meeting</Text>
              <Text style={styles.textMediumBody}>
                We get in the mood for 10 minutes in the “Virtual Starting
                Block” before we start a 60 minute run together. Appropriate
                music accompanies the different phases (warm-up, main phase,
                cool-down) before we end the run briefly in the finisher zone.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../assets/images/BeachRun.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>Beach Run</Text>
              <Text style={styles.textMediumBody}>
                The perfect start to the day, whether you're running, lying on
                the couch or having your first to fifth coffee/tea. Calm,
                relaxed music accompanies us for 45 minutes and inbetween we
                hear the sound of the sea again and again.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../assets/images/OneBookOneRun.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>One Run, One Book</Text>
              <Text style={styles.textMediumBody}>
                The run that not only helps you in terms of sport. Suitable
                music for running and in between listening to the summary of an
                interesting book. 60 minutes just flew by.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../assets/images/FeelTheBeat.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>Feel the beat</Text>
              <Text style={styles.textMediumBody}>
                Just let the tempo of the songs guide you in this musical
                driving game. But manage your strength weell during the 45
                minutes, you don't know exactly how long the stress and rest
                phases are.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../assets/images/LongRun.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>Long run</Text>
              <Text style={styles.textMediumBody}>
                Here you can chat about various topics (not just about running),
                also with interesting interview guests. Of course, motivating
                music should not be missing during the long run. How long is
                this? May vary, but definatly at least 1.5 hours.
              </Text>
            </ImageBackground>
          </View>
          <View>
            <ImageBackground
              source={require("../assets/images/SpecialOffer.png")}
              style={styles.image}
            >
              <Text style={styles.textAccordion}>Special offers</Text>
              <Text style={styles.textMediumBody}>
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

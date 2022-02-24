import { ImageBackground, Text, View, StyleSheet, Alert } from 'react-native';
import React, { Component } from 'react';
import { Rock, Paper, Scissor, Player, Bot, Background } from './assets';
import PlayerViewItem from './components/PlayerViewItem';
import SelectItems from './components/SelectItems';
import Button from './components/Button';

const selectedOptionConstant = [
    { type: 'rock', image: Rock },
    { type: 'paper', image: Paper },
    { type: 'scissor', image: Scissor },
];

export default class GameRockPaperScissor extends Component {
    state = {
        playerSelected: selectedOptionConstant[0],
        botSelected: selectedOptionConstant[1],
        selectOption: selectedOptionConstant,
        score: 0,
        times: 9,
    };

    onPressSelect = (selectedOption) => {
        this.setState({ playerSelected: selectedOption });
    };

    renderSelectOption = () => {
        return this.state.selectOption.map((item, index) => (
            <SelectItems
                key={index}
                selectOption={item}
                onPress={this.onPressSelect}
                selectedOption={this.state.playerSelected.type} />
        ));
    };

    checkResult = () => {
        const {
            playerSelected: { type: playerSelectedType },
            botSelected: { type: botSelectedType },
            times, score
        } = this.state;

        //DRAW CASES
        if (playerSelectedType === botSelectedType) {
            return { times: times - 1, score };
        } //WIN CASES
        else if ((playerSelectedType === 'rock' && botSelectedType === 'scissor') ||
            (playerSelectedType === 'scissor' && botSelectedType === 'paper') ||
            (playerSelectedType === 'paper' && botSelectedType === 'rock')) {
            return { times: times + 1, score: score + 1 };
        } // LOSE CASES
        else {
            return { times: times - 1, score: score - 1 };
        }
    };

    onPressPlayButton = () => {
        if (this.state.times > 0) {
            const randomBotSelect = setInterval(() => {
                const botSelected = selectedOptionConstant[Math.floor(Math.random() * 3)];
                this.setState({ botSelected: botSelected });
            }, 100);

            setTimeout(() => {
                clearInterval(randomBotSelect);
                const { times, score } = this.checkResult();
                this.setState({ times: times, score: score });
            }, 2000)
        } else {
            Alert.alert('Attention', 'Game Over. Please press Reset button!!!');
        }
    };

    onPressResetButton = () => {
        this.setState({ times:9,score:0 });
    }

    render() {
        const { playerSelected, botSelected, score, times } = this.state;

        return (
            <ImageBackground source={Background} style={styles.background}>
                <View style={styles.overlay}></View>
                <View style={styles.container}>
                    {/* PLAYER LAYOUT */}
                    <View style={styles.playerView}>
                        <PlayerViewItem playerImage={Player} playerSelectedImage={playerSelected.image} />
                        <PlayerViewItem playerImage={Bot} playerSelectedImage={botSelected.image} />
                    </View>

                    {/* SELECT ITEMS LAYOUT */}
                    <View style={styles.selectView}>{this.renderSelectOption()}</View>

                    {/* RESULT LAYOUT */}
                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>Score:{score}</Text>
                        <Text style={styles.infoText}>Times:{times}</Text>
                    </View>

                    {/* BUTTON LAYOUT */}
                    <View style={styles.buttonView}>
                        <Button title="Play" onPress={this.onPressPlayButton} />
                        <Button title="Reset" onPress={this.onPressResetButton} />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.6)',
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
    },
    container: {
        flex: 1,
    },
    playerView: {
        flex: 2,
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    selectView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 50,
        justifyContent: 'space-between',
    },
    infoView: {
        flex: 1,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#26ddbb',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    }
})
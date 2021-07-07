export default interface TrancheRequestInterface {
    idTranche: number,
    solo: boolean,
    songUrl: string,
    play: boolean,
    volume: number,
    panStereo: {
        pan: number
    },
    mute:boolean,
    equalizer: {
        highGain: number,
        lowGain: number,
        midHighGain: number,
        midLowGain: number
    },
    asEffect:boolean,
    isPlaying: boolean
}
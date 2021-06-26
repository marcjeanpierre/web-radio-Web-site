import Pizzicato from 'pizzicato'
export interface Tranche {
    id: number;
    volume: number;
    panStereo: {
        pan: number
    };
    panEffect: any;
    equalizer: {
        lowGain: number,
        midLowGain: number,
        midHighGain: number,
        highGain: number,
    };
    equalizerEffect: any;
    solo: boolean;
    mute: boolean;
    isPlaying: boolean;
    asEffect: boolean;
    audioGroup: Pizzicato.Group;
    audioSong: Pizzicato.Song;
    songUrl?: string;
    songTitle?: string;
    songArtist?: string;
    play: boolean
}
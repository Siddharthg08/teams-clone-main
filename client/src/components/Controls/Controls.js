import React,{useState, useEffect} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import EndCallButton from './EndCallButton/EndCallButton';
import ToggleAudioButton from './ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from './ToggleVideoButton/ToggleVideoButton';
import ToggleScreenShareButton from './ToogleScreenShareButton/ToggleScreenShareButton';
import useIsUserActive from './useIsUserActive/useIsUserActive';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import ShareLinkButton from './ShareLinkButton/ShareLinkButton';
import ChatVideo from './ChatVideo/ChatVideo';
import { PropertySafetyFilled } from '@ant-design/icons';
import Captions from './Captions/Captions';


const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            position: 'absolute',
            right: '50%',
            transform: 'translate(50%, 30px)',
            bottom: '50px',
            zIndex: 2100,
            transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
            opacity: 0,
            visibility: 'hidden',
            maxWidth: 'min-content',
            '&.showControls, &:hover': {
                transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
                opacity: 1,
                visibility: 'visible',
                transform: 'translate(50%, 0px)',
            },
            [theme.breakpoints.down('xs')]: {
                bottom: `${theme.sidebarMobileHeight + 3}px`,
            },
        },
    })
);

export default function Controls(props) {
    const classes = useStyles();
    const {roomState} = useRoomState();
    const isReconnecting = roomState === 'reconnecting';
    const isUserActive = useIsUserActive();
    const showControls = isUserActive || roomState === 'disconnected';

    return (
        <div className={clsx(classes.container, {showControls})}>
            <ToggleAudioButton disabled={isReconnecting}/>
            <ToggleVideoButton disabled={isReconnecting}/>
            {roomState !== 'disconnected' && (
                <>
                    <ToggleScreenShareButton disabled={isReconnecting}/>
                    <EndCallButton/>
                    <ShareLinkButton/>
                    <ChatVideo onChangeShowChat={(showChat) => props.onChangeShowChat(showChat)}/>
                    <Captions  onChangeShowCaptions={(showCaptions) => props.onChangeShowCaptions(showCaptions)}/>
                </>
            )}
        </div>
    );
}

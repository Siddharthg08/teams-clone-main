import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import React, {useState, useEffect} from 'react';
import useMainSpeaker from '../../hooks/useMainSpeaker/useMainSpeaker';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import Transcript from "../Transcript/Transcript";
import { ChatEngine } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import {auth} from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker();
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  const videoPriority =
    mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant ? 'high' : null;
    
  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks participant={mainParticipant} disableAudio enableScreenShare videoPriority={videoPriority} mainPariticipant={true}/>
      {/* <Transcript height={"100%"}/> */}
    </MainParticipantInfo>
  );
}

import { Box, Button, Typography, useTheme, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { uploadInStorage } from '../utils/storage';

import {
  EmailUpdateComponent,
  UsernameUpdateComponent,
  PasswordUpdateComponent,
} from '../utils/exporter';
import { useAuth } from '../utils/contexts/authContext';
import { useSelector } from 'react-redux';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.AssistanceColor.main,
  border: `1px solid ${theme.palette.AssistanceColor.main}`,
  width: '20%',
  heigth: '30px',
  borderRadius: '10px',
  marginTop: '5px',
}));

export const UserShowDown = ({ authUser }) => {
  const [displayImage, setDisplayImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [verify, setVerify] = useState(false);

  const imgRef = useRef(null);
  const { palette } = useTheme();
  const { setAvatar, verifyEmail } = useAuth();
  const { todos } = useSelector((state) => state.todoReducer);

  useEffect(() => {
    authUser && setDisplayImage(authUser.photoURL);
  }, [authUser]);

  const avatarSetter = async (event) => {
    const image = event.target.files[0];

    setImageLoading(true);
    const selectedImage = await uploadInStorage(image, authUser.uid);
    setAvatar(selectedImage)
      .then(() => setDisplayImage(selectedImage))
      .catch((err) => console.warn(err))
      .finally(setImageLoading(false));
  };

  const verifyEmailFunction = () => {
    if (authUser.emailVerified) {
      setVerify(true);
      setTimeout(() => {
        setVerify(false);
      }, 2500);
      return;
    }
    verifyEmail().catch((err) => console.warn(err));
    setVerify((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gridTemplateRows: 'repeat(10, 1fr)',
        backgroundColor: palette.secondary.main,
      }}>
      <Box sx={{ gridRow: '1/2', gridColumn: '1/2' }}>
        <Box
          onClick={() => imgRef.current.click()}
          sx={{
            display: 'grid',
            width: '80px',
            margin: '10px',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '50%',
            border: `1px solid${palette.AssistanceColor.main}`,
            overflow: 'hidden',
            aspectRatio: '1/1',
          }}>
          {displayImage ? (
            <img
              style={{ alignSelf: 'center' }}
              height="100%"
              width="100%"
              src={displayImage}
              alt="not available"
            />
          ) : (
            <Typography
              sx={{
                fontSize: '14px',
                width: 'fit-content',
                alignSelf: 'center',
                justifySelf: 'center',
              }}
              align="center"
              component="span">
              upload your avatar
            </Typography>
          )}
        </Box>
        {imageLoading && (
          <Typography
            sx={{ gridRow: '2/3', gridColumn: '1/2', height: 'fit-content', padding: '5px' }}
            variant="h5"
            component="span">
            image is loading
          </Typography>
        )}
        <input type="file" ref={imgRef} hidden onChange={avatarSetter} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gridColumn: '2/-1',
          gridRow: '1/2',
        }}>
        <Typography>User: {authUser.displayName}</Typography>
        <Typography>Email: {authUser.email}</Typography>
        <Typography>Verified: {authUser.emailVerified ? 'yes' : 'no'}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gridRow: '2/3',
          gridColumn: '1/-1',
        }}>
        <StyledButton
          name="username"
          onClick={() => {
            setEditUsername((prevValue) => !prevValue);
            setEditEmail(false);
            setEditPassword(false);
          }}>
          <Typography sx={{ fontSize: '12px' }}>Change your username</Typography>
        </StyledButton>
        <StyledButton
          onClick={() => {
            setEditEmail((prevValue) => !prevValue);
            setEditUsername(false);
            setEditPassword(false);
          }}>
          <Typography sx={{ fontSize: '12px' }}> Change your email address</Typography>
        </StyledButton>
        <StyledButton id="emailVerifier" onClick={verifyEmailFunction}>
          <Typography sx={{ fontSize: '12px' }}>verify your email</Typography>
        </StyledButton>
        <StyledButton
          onClick={() => {
            setEditPassword((prevValue) => !prevValue);
            setEditEmail(false);
            setEditUsername(false);
          }}>
          <Typography sx={{ fontSize: '12px' }}>change your password</Typography>
        </StyledButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gridRow: '3/-1',
          gridColumn: '1/-1',
          margin: '10px 0',
        }}>
        {editUsername && <UsernameUpdateComponent setEditUsername={setEditUsername} />}
        {editEmail && <EmailUpdateComponent setEditEmail={setEditEmail} />}
        {verify && (
          <Typography sx={{ alignSelf: 'center' }} variant="h5">
            {authUser.emailVerified
              ? 'your email is already verified'
              : 'Check your email for verification'}
          </Typography>
        )}
        {editPassword && <PasswordUpdateComponent setEditPassword={setEditPassword} />}
        {!editPassword && !verify && !editEmail && !editUsername && (
          <Typography sx={{ alignSelf: 'center' }} variant="h4">
            You have {todos.length} todos
          </Typography>
        )}
      </Box>
    </Box>
  );
};

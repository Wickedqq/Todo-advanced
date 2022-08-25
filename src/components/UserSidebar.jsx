import { Box, Button, Typography, useTheme, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { uploadInStorage } from '../utils/storage';

import {
  EmailUpdateComponent,
  UsernameUpdateComponent,
  PasswordUpdateComponent,
} from '../utils/exporter';
import { useAuth } from '../utils/contexts/authContext';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.AssistanceColor.main,
  border: `1px solid ${theme.palette.AssistanceColor.main}`,
  borderRadius: '10px',
  marginTop: '5px',
}));

export const UserSidebar = ({ authUser }) => {
  const [displayImage, setDisplayImage] = useState(
    window.localStorage.getItem('userAvatar') || null,
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [verify, setVerify] = useState(false);

  const imgRef = useRef(null);
  const { setAvatar, verifyEmail } = useAuth();
  const { palette } = useTheme();

  useEffect(() => {
    if (authUser) {
      window.localStorage.setItem('userAvatar', authUser.photoURL);
    } else {
      setDisplayImage(null);
    }
  }, [authUser]);

  const avatarSetter = async (event) => {
    const image = event.target.files[0];

    setImageLoading(true);
    const selectedImage = await uploadInStorage(image, authUser.uid);
    setAvatar(selectedImage)
      .then(() => {
        setDisplayImage(selectedImage);
        window.localStorage.setItem('userAvatar', selectedImage);
      })
      .catch((err) => console.warn(err))
      .finally(setImageLoading(false));
  };

  const verifyEmailFunction = () => {
    if (authUser.emailVerified) {
      setVerify(true);
      setTimeout(() => {
        setVerify(false);
      }, 2200);
      return;
    }
    verifyEmail()
      .then(() => setVerify((prev) => !prev))
      .catch((err) => console.warn(err));
  };

  return (
    <Box
      sx={{
        minWidth: '300px',
        display: { mobile: 'none', tablet: 'grid' },
        gridTemplateRows: 'repeat(10, 1fr)',
        gridRow: '1/-1',
        gridColumn: '1/3',
        gap: 2,
        backgroundColor: palette.secondary.main,
      }}>
      <Box
        onClick={() => imgRef.current.click()}
        sx={{
          display: 'grid',
          gridRow: '1/3',
          backgroundColor: 'white',
          color: 'black',
          overflow: 'hidden',
          minHeight: '200px',
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
            sx={{ wdith: 'fit-content', alignSelf: 'center', justifySelf: 'center' }}
            align="center"
            variant="h6"
            component="span">
            upload your avatar
          </Typography>
        )}
      </Box>
      {imageLoading && (
        <Typography
          sx={{ gridRow: '3/4', height: 'fit-content', padding: '5px' }}
          variant="h5"
          component="span">
          image is loading
        </Typography>
      )}
      <input type="file" ref={imgRef} hidden onChange={avatarSetter} />
      <Box sx={{ gridRow: '4/5', marginLeft: '10px' }}>
        <Typography variant="h5">user: {authUser.displayName}</Typography>
        <StyledButton
          name="username"
          onClick={() => {
            setEditUsername((prevValue) => !prevValue);
            setEditEmail(false);
            setEditPassword(false);
          }}>
          Change your username
        </StyledButton>
        {editUsername && <UsernameUpdateComponent setEditUsername={setEditUsername} />}
      </Box>
      <Box sx={{ gridRow: '5/6', marginLeft: '10px' }}>
        <Typography variant="h5">email: {authUser.email}</Typography>
        <StyledButton
          onClick={() => {
            setEditEmail((prevValue) => !prevValue);
            setEditUsername(false);
            setEditPassword(false);
          }}>
          Change your email address
        </StyledButton>
        {editEmail && <EmailUpdateComponent setEditEmail={setEditEmail} />}
      </Box>
      <Box sx={{ gridRow: '6/7', marginLeft: '10px' }}>
        <Typography variant="h5">
          email is verified: {authUser.emailVerified ? 'yes' : 'no'}
        </Typography>
        <StyledButton onClick={verifyEmailFunction}>verify your email</StyledButton>
        {verify && (
          <Typography>
            {authUser.emailVerified
              ? 'your email is already verified'
              : 'Check your email for verification'}
          </Typography>
        )}
      </Box>
      <Box sx={{ gridRow: '7/8', marginLeft: '10px' }}>
        <StyledButton
          onClick={() => {
            setEditPassword((prevValue) => !prevValue);
            setEditEmail(false);
            setEditUsername(false);
          }}>
          change your password
        </StyledButton>
        {editPassword && <PasswordUpdateComponent setEditPassword={setEditPassword} />}
      </Box>
    </Box>
  );
};

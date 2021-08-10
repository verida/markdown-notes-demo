import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import metaMaskIcon from '../../assets/images/meta-mask.jpg';
import { makeStyles } from '@material-ui/core';
import { AppContext } from '../../contextApi/ContextProvider';
import ModalAlert from '../modalAlert/ModalAlert';


const useStyles = makeStyles(() => ({
  root: {
    padding: '0.4rem',
    margin: '0 1rem',
  },
  textContent: {
    display: 'block',
    textAlign: 'center',
    margin: '0.6rem 0.3rem',
  }
}));
const metaMasksLink = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

const ErrorPage = () => {
  const classes = useStyles()
  const { error, open, setOpen } = useContext(AppContext);


  return (
    <div>
      <ModalAlert open={open} setOpen={setOpen} title={error.title}>
        {
          error.type === 'ethereum' ?
            <>
              <img src={metaMaskIcon} alt="Meta Mask" />
              <span className={classes.textContent}>
                {error.message}
              </span>
              <Button
                href={metaMasksLink}
                target="_blanck"
                variant="contained"
                color="secondary">
                Install Meta Mask
              </Button>
            </>
            :
            error.message
        }
      </ModalAlert>
    </div>
  )
}

export default ErrorPage

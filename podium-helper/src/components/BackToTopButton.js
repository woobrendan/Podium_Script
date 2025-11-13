import {useEffect, useState} from 'react';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import IconButton from '@material-ui/core/IconButton';
import '../Styling/toTopButton.scss'


function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setBackToTopButton(true) : setBackToTopButton(false)
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 50,
      behavior: "smooth"
    })
  }
  return (
    <div className="backToTopButton">
      {backToTopButton &&
        <IconButton onClick={scrollUp} id="To-Top-Button">
          <ArrowCircleUpTwoToneIcon  />
        </IconButton>
      }
    </div>
  )
}

export default BackToTopButton

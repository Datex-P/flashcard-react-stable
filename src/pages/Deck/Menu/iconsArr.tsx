import settingsIcon from '../../../icons/settings.svg'
import statsIcon from '../../../icons/stats.svg'
import logoutIcon from '../../../icons/logout.svg'

export const iconsArr = [
  {
    src: statsIcon,
    alt: "statsIcon",
    href: "stats",
    style:{
      textDecoration: 'none',
      height: '30px',
      display: 'flex',
      flex: '1',
      justifyContent:'center',
      alignItems:'center'
    }
  },
  {
    src: settingsIcon,
    alt: "settingsIcon",
    href: "settings",
    style:{
      textDecoration: 'none',
      height: '30px',
      display: 'flex',
      flex: '1',
      justifyContent:'center',
      alignItems:'center',
      borderLeft: "2px solid black",
      borderRight: "2px solid black"
    }
  },
  {
    src: logoutIcon,
    alt: "logoutIcon",
    href: "logout",
    style:{
      textDecoration: 'none',
      height: '30px',
      display: 'flex',
      flex: '1',
      justifyContent:'center',
      alignItems:'center'
    }
  },
]
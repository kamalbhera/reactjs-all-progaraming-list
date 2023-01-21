import { Link } from 'react-router-dom'
import {NavHeader, WebsiteLogo} from './styledComponents'

const Header = () => (
  <NavHeader>
    <Link to="/">
      <WebsiteLogo
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjfu89jbVTCM42DUsBjOeNodBpqhI3ONtZZd6dgDtBibFsr117xXBTAOx9d3Y42sla1Aw&usqp=CAU"
        alt="website logo"
      />
    </Link>
  </NavHeader>
)

export default Header

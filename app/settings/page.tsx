import NavBar from "@/components/nav-bar"
import { getUserInfo } from "../actions/user/action"
import SettingsComponent from "./component"

const settingsPage = async() => {
    
  return (
    <>
    <NavBar/>
    <SettingsComponent />
    </>
  )
}

export default settingsPage
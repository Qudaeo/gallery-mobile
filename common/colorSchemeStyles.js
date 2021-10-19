import {useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

export const isDarkMode = useColorScheme() === 'dark'

export const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
}

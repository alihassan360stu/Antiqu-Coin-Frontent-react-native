import { LinearGradient } from 'react-native-linear-gradient';

const LinearGradientWrapper = ({
    children,
    colors = ['#076585', '#F09819', '#fc94b3'],
    style = {}
}) => {
    return <LinearGradient
        style={style}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={colors} >
        {children}
    </LinearGradient>
}

export default LinearGradientWrapper
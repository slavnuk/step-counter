import Animated, { useAnimatedProps, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { View } from "react-native";
import SVG, { Circle, CircleProps, Rect } from 'react-native-svg';
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingPorgressProps = {
    radius?: number
    strokeWidth?: number,
    progress: number
}

const color = "#EE0F55"

const RingProgress = ({
    radius = 100, 
    strokeWidth = 35,
    progress
}: RingPorgressProps) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const fill = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * fill.value, circumference]
    }))

    useEffect(() => {
        fill.value = withTiming(progress, {duration: 1500});
    }, [progress])

    const circleDefaultProps: CircleProps = {
        r: innerRadius,
        cx: radius,
        cy: radius,
        originX: radius,
        originY: radius,
        strokeWidth: strokeWidth,
        stroke: color,
        strokeLinecap: "round",
        rotation: '-90'
    }

  return (
    <View style={{ 
            width: radius * 2, 
            height: radius * 2, 
            alignSelf: 'center'
        }}>
        <SVG>
            <Circle {...circleDefaultProps}opacity={0.2}/>
            <AnimatedCircle 
                animatedProps={animatedProps}
                {...circleDefaultProps}
            />
        </SVG>
        <AntDesign 
        name="arrowright" 
        size={strokeWidth * 0.8} 
        color="black" 
        style={{position: 'absolute', alignSelf: 'center', top: strokeWidth * 0.1}}/>
    </View>
  )
};

export default RingProgress;

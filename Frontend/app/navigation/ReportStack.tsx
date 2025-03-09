import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportProblemScreen from "../screens/ReportProblemScreen";
import AccessScreen from "../screens/AccessScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import ErrorScreen from "../screens/ErrorScreen";


const Stack = createStackNavigator();

const ReportStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccessScreen" component={AccessScreen}/>
            <Stack.Screen name="ReportProblemScreen" component={ReportProblemScreen}/>
            <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen}/>
            <Stack.Screen name="ErrorScreen" component={ErrorScreen}/>
        </Stack.Navigator>
    )
}

export default ReportStack;
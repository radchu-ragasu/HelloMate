<<<<<<< HEAD
// In your navigation file (e.g., AppNavigator.tsx)
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen6 from '../order details/OrderScreen6';
import { RootStackParamList } from '../navigation/navigation';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen 
        name="OrderScreen6" 
        component={OrderScreen6} 
        options={{ headerShown: false }} // Since we have our own header
      />
      {/* Other screens */}
    </Stack.Navigator>
  );
}
export default AppNavigator;
=======

>>>>>>> 7616f9256d780dc40f20680072a758896ffea9b0

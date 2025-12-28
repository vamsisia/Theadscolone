import { Slot, Stack } from "expo-router";

export default function profileScreen(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{title:'profile'}} />
            <Stack.Screen name="Edit" options={{title : 'Edit Screen'}} />
        </Stack>
    );
}
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;
export default function KeyboardAvoidingContainer({children}: Readonly<Props>) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={useHeaderHeight()}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
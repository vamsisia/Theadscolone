import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import {View, Text , Image, Alert, Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Supabase } from '@/lib/supabase';


export default function UserAvatarPicker( {currentAvatar , onUpload} 
    : {currentAvatar ? :string;
        onUpload : (path : string) =>void
    }){

        const [uploading, setUploading] = useState(false)

        async function uploadAvatar() {
            try {
              setUploading(true)
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'], // Restrict to only images
                allowsMultipleSelection: false, // Can only select one image
                allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
                quality: 1,
              })
              if (result.canceled || !result.assets || result.assets.length === 0) {
                console.log('User cancelled image picker.')
                return
              }
              const image = result.assets[0]
              console.log('Got image', image)
              if (!image.uri) {
                throw new Error('No image uri!') // Realistically, this should never happen, but just in case...
              }
              const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())
              const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
              const path = `${Date.now()}.${fileExt}`
              const { data, error: uploadError } = await Supabase.storage
                .from('avatars')
                .upload(path, arraybuffer, {
                  contentType: image.mimeType ?? 'image/jpeg',
                })
              if (uploadError) {
                throw uploadError
              }
              onUpload(data.path)
            } catch (error) {
              if (error instanceof Error) {
                Alert.alert(error.message)
              } else {
                throw error
              }
            } finally {
              setUploading(false)
            }
          }

          const avatar_url = Supabase.storage.from('avatars').getPublicUrl(currentAvatar || '').data.publicUrl
            return (
        <Pressable onPress={uploadAvatar} className='self-center'>
        <Image 
        source={{uri : avatar_url}} 
        className='w-32 h-32 rounded-full self-center' />
        
        </Pressable>
    )
    
}
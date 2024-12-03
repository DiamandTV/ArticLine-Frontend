
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'

export function ImagePicker(){
  const config2: ImagePickerConf = {
    borderRadius: '8px',
    language: 'en',
    width: '330px',
    height: '250px',
    objectFit: 'contain',
    compressInitial: null,
    darkMode: false,
    rtl: false
  };
  // const initialImage: string = '/assets/images/8ptAya.webp';
  const initialImage = '';

 return (<div>
        < ReactImagePickerEditor
            config={config2}
            imageSrcProp={initialImage}
             />
        </div>
 )
}
 
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface Props {
    // hidden: boolean;
    // settings: Settings;
    // toggleNavVisibility: () => void;
    // saveSettings: (values: Settings) => void;
    // verticalAppBarContent?: (props?: any) => ReactNode;
    getImageProperty?: (width: number, height: number, file:any) => void;
}

export default function UploadImage(props: Props) {

    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = (event) => {
                // Do whatever you want with the file contents
                const images = new Image();
                images.src = reader.result?.toString() ?? "";
              
                images.onload = function (event) {
                    let imagesWidth = images.width
                    let imagesHeight = images.height
                    Object.assign(file, {
                        preview: URL.createObjectURL(file) ?? ""
                    })

                    if (props.getImageProperty) {
                        props.getImageProperty(imagesWidth, imagesHeight, file)
                    }
                };

               

                // props.setImage(file)
            }
            reader.readAsDataURL(file)
        })

    }, [])


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop
    });


    return (
        <div className="w-full text-center border-dashed border border-black px-5 py-3" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop, or <span>browse</span> PNG, JPG, JPEG, or Other Image Format</p>
        </div>
    )
}
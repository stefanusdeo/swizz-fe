import Foooter from "@/component/footer";
import Navigation from "@/component/navigation";
import {
    MenuItem,
    OutlinedInputProps,
    TextField,
    TextFieldProps
} from "@mui/material";
import { styled } from '@mui/material/styles';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IFormContact } from "@/stores/types/generalTypes";
import useGeneral from "@/stores/hooks/general";


const RedditTextField = styled((props: any) => {
    if (props.register) {
        return (
            <TextField
                {...props.register(props?.name, { required: `${props.label} is required` })}
                InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                {...props}
            />
        )
    }
    return (
        <TextField
            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    )

})(({ theme, error }) => ({
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#F3F6F9',
        border: '1px solid',
        borderColor: error ? '#d32f2f' : '#E0E3E7',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            borderColor: error ? '#d32f2f' : '#000',
        },
    },
    '& .MuiInputLabel-root': {
        '&.Mui-focused': {
            color: error ? '#d32f2f' : '#000'
        },
    }
}));


export default function ContactUs() {
    const {
        handleSubmitContact
    } = useGeneral()

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required."),
        email: Yup.string()
            .required("Email is required.")
            .email("Invalid Email Format"),
        message: Yup.string()
            .required("Message is required."),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormContact>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: IFormContact) => {
        handleSubmitContact(data).then(
            res => {
                if (res.code === 200) {
                    reset({
                        email: "",
                        message: '',
                        name: ""
                    })
                }
            }
        )
    }
    return (
        <>
            <Navigation />
            <div className="pt-[135px] w-full content-layer">
                <div className="w-1/2 mx-auto py-10">
                    <h1 className="text-center text-[50px] tracking-[3px] font-bold mb-5">
                        CONTACT
                    </h1>
                    <h2 className="text-center text-[24px] tracking-[1px] font-medium mb-7">
                        How we can help you?
                    </h2>
                    <form
                        className="p-2 flex flex-col my-4 gap-6 allDekstop:pt-10"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full mb-3">
                            <RedditTextField
                                label="Email"
                                id="email"
                                type="text"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                fullWidth
                                name="email"
                                register={register}
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                        </div>
                        <div className="w-full">
                            <RedditTextField
                                label="Name"
                                id="name"
                                type="text"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                fullWidth
                                name="name"
                                register={register}
                                error={errors.name}
                                helperText={errors.name?.message}
                            />
                        </div>
                        <div className="w-full">
                            <RedditTextField
                                multiline
                                rows={4}
                                label="Message"
                                id="message"
                                type="text"
                                variant="filled"
                                style={{ marginTop: 11 }}
                                fullWidth
                                name="message"
                                register={register}
                                error={errors.message}
                                helperText={errors.message?.message}
                            />
                        </div>
                        <button className="mt-5 w-full bg-[#ffce07] text-center py-5 text-2xl font-bold" type="submit">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
            <Foooter />
        </>
    )
}
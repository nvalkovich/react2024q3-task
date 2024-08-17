import { useForm } from 'react-hook-form';

interface FormInputData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  conditionsAccepted: string;
  file: string;
  country: string;
}

export const FormWithHook = () => {
  const { register, handleSubmit } = useForm<FormInputData>();

  const onSubmit = (data: FormInputData) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="form-title">Form with React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('name')} />

        <label>Age</label>
        <input {...register('age')} />

        <label>Email</label>
        <input {...register('email')} />

        <label>Password</label>
        <input {...register('password')} />

        <label>Confirm password</label>
        <input {...register('confirmPassword')} />

        <label>Gender</label>
        <input {...register('gender')} />

        <label>I agree to the terms and conditions</label>
        <input type="checkbox" {...register('conditionsAccepted')} />

        <div className="file-input-container">
          <input type="file" {...register('file')} />
        </div>
        <label>Country</label>
        <input {...register('country')} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

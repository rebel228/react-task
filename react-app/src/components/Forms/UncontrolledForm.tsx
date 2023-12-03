import { object, string, number, mixed, bool, ValidationError } from 'yup';
import './From.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { isValidFileType } from '../../utils/validateFile';
import { useAppDispatch } from '../../hooks/redux';
import { formSlice } from '../../store/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 202400;

export default function UndcontrolledForm() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>();
  const [errors, setErrors] = useState({
    username: false,
    age: false,
    email: false,
    password: false,
    passwordrepeat: false,
    gender: false,
    terms: false,
    image: false,
  });

  const dispatch = useAppDispatch();
  const { addForm } = formSlice.actions;
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const formData = {
    username: nameRef.current?.value,
    age: ageRef.current?.value,
    email: emailRef.current?.value,
    password: passwordRef.current?.value,
    passwordrepeat: passwordRepeatRef.current?.value,
    gender: gender,
    terms: termsRef.current?.value,
    image: imageRef.current?.files ? imageRef.current?.files[0] : null,
  };

  const userSchema = object({
    username: string()
      .required('please enter your name')
      .test(
        'first-letter',
        'First letter is not capital',
        (value) => value.charAt(0) === value.charAt(0).toUpperCase()
      ),
    age: number()
      .required('please enter your age')
      .positive('age must be positive')
      .integer('age must be integer'),
    email: string().required('please enter email').email('enter a valid email'),
    password: string()
      .required('please enter a password')
      .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
    passwordrepeat: string()
      .required('Please repeat the password')
      .test(
        'password-match',
        "passwords don't match",
        (value) => passwordRef.current?.value === value
      ),
    gender: mixed().required('please select a gender').oneOf(['man', 'woman']),
    terms: bool().oneOf([true], 'You need to accept the terms and conditions'),
    image: mixed<File>()
      .required('please upload a file')
      .test('is-valid-file-type', 'only png and jpeg are allowed', (value) =>
        isValidFileType(value.name.toLowerCase())
      )
      .test(
        'is-valid-size',
        'max allowed size is 100KB',
        (value) => value && value.size <= MAX_FILE_SIZE
      ),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleGender = (event: FormEvent<HTMLDivElement>) => {
    const element = event.target as HTMLInputElement;
    setGender(element.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formData.image = imageRef.current?.files
      ? imageRef.current?.files[0]
      : null;

    const isValid = await userSchema.isValid(formData, { abortEarly: false });

    if (isValid) handleDispatch();
    else handleErrors();
  };

  const handleDispatch = async () => {
    console.log('valid', formData);
    const reader = new FileReader();
    if (formData.image) reader.readAsDataURL(formData.image);
    if (formData.image) {
      const { username, age, email, password, gender, terms } = formData;
      reader.onloadend = () => {
        dispatch(
          addForm({
            username,
            age,
            email,
            password,
            gender,
            terms,
            image: reader.result,
          })
        );
        navigate('/');
      };
    }
  };

  const handleErrors = async () => {
    await userSchema.validate(formData, { abortEarly: false }).catch((err) => {
      const validationErrors = err.inner.reduce(
        (acc: ValidationError[], error: ValidationError) => {
          if (error.path)
            return {
              ...acc,
              [error.path]: error.message,
            };
        },
        {}
      );
      console.log('validation errors:', validationErrors);
      setErrors(() => {
        return {
          username: validationErrors.username || false,
          age: validationErrors.age || false,
          email: validationErrors.email || false,
          password: validationErrors.password || false,
          passwordrepeat: validationErrors.passwordrepeat || false,
          gender: validationErrors.gender || false,
          terms: validationErrors.terms || false,
          image: validationErrors.image || false,
        };
      });
    });
  };

  return (
    <form
      id="Form__uncontrolled"
      className="Form__uncontrolled"
      onSubmit={handleSubmit}
    >
      <h1>Fill the data</h1>

      <div
        id="usernamefield"
        className={`field${errors.username ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="username">
          Name
        </label>
        <input
          className="form-control field__input"
          type="text"
          name="username"
          id="username"
          ref={nameRef}
          required
        />
        <div className="invalid-tooltip">
          {errors.username && errors.username}
        </div>
      </div>

      <div id="agefield" className={`field${errors.age ? ' error' : ''}`}>
        <label className="field__label" htmlFor="age">
          Age
        </label>
        <input
          className="form-control field__input"
          type="number"
          name="age"
          id="age"
          ref={ageRef}
          required
        />
        <div className="invalid-tooltip">{errors.age && errors.age}</div>
      </div>

      <div id="emailfield" className={`field${errors.email ? ' error' : ''}`}>
        <label className="field__label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control field__input"
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          required
        />
        <div className="invalid-tooltip">{errors.email && errors.email}</div>
      </div>

      <div
        id="passwordfield"
        className={`field${errors.password ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control field__input"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          required
        />
        <div className="invalid-tooltip">
          {errors.password && errors.password}
        </div>
      </div>

      <div
        id="passwordrepeat-field"
        className={`field${errors.passwordrepeat ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="passwordrepeat">
          Repeat password
        </label>
        <input
          className="form-control field__input"
          type="password"
          name="passwordrepeat"
          id="passwordrepeat"
          ref={passwordRepeatRef}
          required
        />
        <div className="invalid-tooltip">
          {errors.passwordrepeat && errors.passwordrepeat}
        </div>
      </div>

      <div
        id="gender-field"
        className={`field${errors.gender ? ' error' : ''}`}
        onChange={handleGender}
      >
        <label className="field__label">Select gender</label>
        <input
          className="form-control field__input"
          type="radio"
          name="gender"
          id="man"
          value={'man'}
        />
        <label htmlFor="man">Man</label>
        <input
          className="form-control field__input"
          type="radio"
          name="gender"
          id="woman"
          value={'woman'}
        />
        <label htmlFor="woman">Woman</label>
        <div className="invalid-tooltip">{errors.gender && errors.gender}</div>
      </div>

      <div id="terms-field" className={`field${errors.terms ? ' error' : ''}`}>
        <label className="field__label">Read and accept T&C</label>
        <input
          className="form-control field__input"
          type="checkbox"
          name="terms"
          id="terms"
          value={'true'}
          ref={termsRef}
          required
        />
        <label htmlFor="terms">I have read and accept T&C</label>
        <div className="invalid-tooltip">{errors.terms && errors.terms}</div>
      </div>

      <div id="image-field" className={`field${errors.image ? ' error' : ''}`}>
        <label className="field__label" htmlFor="image">
          Upload an image
        </label>
        <input
          className="form-control field__input"
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg"
          ref={imageRef}
        />
        <div className="invalid-tooltip">{errors.image && errors.image}</div>
      </div>

      <div className="field submit">
        <button id="form-submit" type="submit" className="field__button">
          Submit
        </button>
      </div>
    </form>
  );
}

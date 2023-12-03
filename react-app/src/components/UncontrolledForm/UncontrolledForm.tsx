import { object, string, number, mixed, bool } from 'yup';
import './UncontrolledFrom.scss';
import { FormEvent, useRef, useState } from 'react';
import { isValidFileType } from '../../utils/validateFile';
import { useAppDispatch } from '../../hooks/redux';
import { formSlice } from '../../store/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 202400;

export default function UndcontrolledForm() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string>();
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
    password: string().required('please enter a password'),
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

    if (isValid) {
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
    } else
      userSchema.validate(formData, { abortEarly: false }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      id="Form__uncontrolled"
      className="Form__uncontrolled"
      onSubmit={handleSubmit}
    >
      <h1>Fill the data</h1>

      <div id="usernamefield" className="field">
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
        <div className="invalid-tooltip"></div>
        <p className="field__description">
          First character must me upper cased
        </p>
      </div>

      <div id="agefield" className="field">
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
        <div className="invalid-tooltip"></div>
        <p className="field__description">
          Should be number, no negative values
        </p>
      </div>

      <div id="emailfield" className="field">
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
        <div className="invalid-tooltip"></div>
      </div>

      <div id="passwordfield" className="field">
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
        <div className="invalid-tooltip"></div>
        <p className="field__description">
          Use a number, a uppercased character, a lowercased character, a
          special character
        </p>
      </div>

      <div id="passwordrepeat-field" className="field">
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
        <div className="invalid-tooltip"></div>
      </div>

      <div id="gender-field" className="field" onChange={handleGender}>
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
        <div className="invalid-tooltip"></div>
      </div>

      <div id="terms-field" className="field">
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
        <div className="invalid-tooltip"></div>
      </div>

      <div id="image-field" className="field">
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
        <div className="invalid-tooltip"></div>
      </div>

      <div className="field">
        <button id="form-submit" type="submit" className="field__button">
          Submit
        </button>
      </div>
    </form>
  );
}

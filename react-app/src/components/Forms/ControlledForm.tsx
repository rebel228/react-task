import { object, string, number, mixed, bool, ref } from 'yup';
import './From.scss';
import { isValidFileType } from '../../utils/validateFile';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { formSlice } from '../../store/reducers/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RawUserFormsData } from '../../types/types';

const MAX_FILE_SIZE = 202400;

export default function ControlledForm() {
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
      .oneOf([ref('password')], 'Passwords do not match'),
    gender: string().required('please select a gender').oneOf(['man', 'woman']),
    terms: bool().oneOf([true], 'You need to accept the terms and conditions'),
    image: mixed<FileList>()
      .required('please upload a file')
      .test('is-valid-file-type', 'only png and jpeg are allowed', (value) =>
        value[0] ? isValidFileType(value[0].name.toLowerCase()) : false
      )
      .test(
        'is-valid-size',
        'max allowed size is 100KB',
        (value) => value[0] && value[0].size <= MAX_FILE_SIZE
      ),
    country: string()
      .required('please select a country')
      .test('is-validcountry', 'please select a valid country', (value) =>
        countries.includes(value)
      ),
  });

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addForm } = formSlice.actions;
  const countries = useAppSelector((state) => state.countiesReducer);

  const onSubmit = async (data: Partial<RawUserFormsData>) => {
    console.log(data);
    const reader = new FileReader();
    if (data.image && data.image[0]) reader.readAsDataURL(data.image[0]);
    const { username, age, email, password, gender, terms, country } = data;
    reader.onloadend = () => {
      console.log(terms);
      dispatch(
        addForm({
          username,
          age,
          email,
          password,
          gender,
          terms,
          image: reader.result,
          country,
        })
      );
      navigate('/');
    };
  };

  return (
    <form
      id="Form__controlled"
      className="Form__controlled"
      onSubmit={handleSubmit(onSubmit)}
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
          {...register('username')}
          className="form-control field__input"
          type="text"
          id="username"
          required
        />
        <div className="invalid-tooltip">
          {errors.username && errors.username.message}
        </div>
      </div>

      <div id="agefield" className={`field${errors.age ? ' error' : ''}`}>
        <label className="field__label" htmlFor="age">
          Age
        </label>
        <input
          {...register('age')}
          className="form-control field__input"
          type="number"
          id="age"
          required
        />
        <div className="invalid-tooltip">
          {errors.age && errors.age.message}
        </div>
      </div>

      <div id="emailfield" className={`field${errors.email ? ' error' : ''}`}>
        <label className="field__label" htmlFor="email">
          Email
        </label>
        <input
          {...register('email')}
          className="form-control field__input"
          type="email"
          id="email"
          required
        />
        <div className="invalid-tooltip">
          {errors.email && errors.email.message}
        </div>
      </div>

      <div
        id="passwordfield"
        className={`field${errors.password ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="password">
          Password
        </label>
        <input
          {...register('password')}
          className="form-control field__input"
          type="password"
          id="password"
          required
        />
        <div className="invalid-tooltip">
          {errors.password && errors.password.message}
        </div>
      </div>

      <div
        id="passwordrepeat-field"
        className={`field${errors.password ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="passwordrepeat">
          Repeat password
        </label>
        <input
          {...register('passwordrepeat')}
          className="form-control field__input"
          type="password"
          id="passwordrepeat"
          required
        />
        <div className="invalid-tooltip">
          {errors.passwordrepeat && errors.passwordrepeat.message}
        </div>
      </div>

      <div
        id="gender-field"
        className={`field${errors.gender ? ' error' : ''}`}
      >
        <label className="field__label">Select gender</label>
        <input
          {...register('gender')}
          className="form-control field__input"
          type="radio"
          id="man"
          value={'man'}
        />
        <label htmlFor="man">Man</label>
        <input
          {...register('gender')}
          className="form-control field__input"
          type="radio"
          id="woman"
          value={'woman'}
        />
        <label htmlFor="woman">Woman</label>
        <div className="invalid-tooltip">
          {errors.gender && errors.gender.message}
        </div>
      </div>

      <div id="terms-field" className={`field${errors.terms ? ' error' : ''}`}>
        <label className="field__label">Read and accept T&C</label>
        <input
          {...register('terms')}
          className="form-control field__input"
          type="checkbox"
          id="terms"
          value={'true'}
          required
        />
        <label htmlFor="terms">I have read and accept T&C</label>
        <div className="invalid-tooltip">
          {errors.terms && errors.terms.message}
        </div>
      </div>

      <div id="image-field" className={`field${errors.image ? ' error' : ''}`}>
        <label className="field__label" htmlFor="image">
          Upload an image
        </label>
        <input
          {...register('image')}
          className="form-control field__input"
          type="file"
          id="image"
          accept="image/png, image/jpeg"
        />
        <div className="invalid-tooltip">
          {errors.image && errors.image.message}
        </div>
      </div>

      <div
        id="countryfield"
        className={`field${errors.username ? ' error' : ''}`}
      >
        <label className="field__label" htmlFor="country">
          Country
        </label>
        <input
          {...register('country')}
          className="form-control field__input"
          type="text"
          id="country"
          list="country-list"
          required
        />
        <datalist id="country-list">
          {countries.map((country, index) => {
            return <option value={country} key={index} />;
          })}
        </datalist>
        <div className="invalid-tooltip">
          {errors.country && errors.country.message}
        </div>
      </div>

      <div className="field submit">
        <button
          id="form-submit"
          type="submit"
          className={`field__button${!formState.isValid && ' disabled'}`}
          disabled={!formState.isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

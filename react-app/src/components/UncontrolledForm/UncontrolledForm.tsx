import './UncontrolledFrom.scss';

export default function UndcontrolledForm() {
  return (
    <form id="Form__uncontrolled" className="Form__uncontrolled">
      <h1>Fill the data</h1>

      <div id="namefield" className="field">
        <label className="field__label" htmlFor="name">
          Name
        </label>
        <input
          className="form-control field__input"
          type="text"
          name="name"
          id="name"
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
          required
        />
        <div className="invalid-tooltip"></div>
        <p className="field__description">
          Use a number, a uppercased character, a lowercased character, a
          special character
        </p>
      </div>

      <div id="password-repeat-field" className="field">
        <label className="field__label" htmlFor="password-repeat">
          Repeat password
        </label>
        <input
          className="form-control field__input"
          type="password"
          name="password-repeat"
          id="password-repeat"
          required
        />
        <div className="invalid-tooltip"></div>
      </div>

      <div id="gender-field" className="field">
        <label className="field__label">Select gender</label>
        <input
          className="form-control field__input"
          type="radio"
          name="gender"
          id="gender"
          value={'man'}
        />
        <label htmlFor="man">Man</label>
        <input
          className="form-control field__input"
          type="radio"
          name="gender"
          id="gender"
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
          value={'terms'}
        />
        <label htmlFor="terms">I have read and accept T&C</label>
        <div className="invalid-tooltip"></div>
      </div>
    </form>
  );
}

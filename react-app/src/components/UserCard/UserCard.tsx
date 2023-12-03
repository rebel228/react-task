import { UserFormData } from '../../types/types';
import './UserCard.scss';

type UserCardProps = {
  form: UserFormData;
};

export default function UserCard(props: UserCardProps) {
  return (
    <div className="user">
      <p className="user__text">Name: {props.form.username}</p>
      <p className="user__text">Age: {props.form.age}</p>
      <p className="user__text">Email: {props.form.email}</p>
      <p className="user__text">Password: {props.form.password}</p>
      <p className="user__text">Gender: {props.form.gender}</p>
      <p className="user__text">Accepted terms: {props.form.terms}</p>
      <img
        src={`data:image/jpg;${props.form.image}`}
        alt="user avatar"
        className="user__image"
      />
    </div>
  );
}

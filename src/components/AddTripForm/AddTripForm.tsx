import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';
import ReactModal from 'react-modal';

import { FormData } from '../../models/models';
import { addTrip, setCurrentTrip } from '../../redux/slices/tripsSlice'
import { selectCities } from '../../redux/store/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { addTripSchema } from '../../utils/validationSchemas/addTripSchema';
import './index.css'

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 14);

interface AddTripFormProps {
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	showForm: boolean
}

const AddTripForm: React.FC<AddTripFormProps> = ({ setShowForm, showForm }) => {
	const dispatch = useAppDispatch();
	const cities = useAppSelector(selectCities)
	const { control, formState: { errors, isValid }, handleSubmit, reset } = useForm({
		mode: "onChange",
		resolver: yupResolver(addTripSchema)
	});
	const toggleModal = () => {
		setShowForm(!showForm);
	};

	const onSubmit = (data: FormData) => {
		if (data.startDate && data.endDate) {
			const startDate = new Date(data.startDate);
			const endDate = new Date(data.endDate);

			const formattedData = {
				...data,
				endDate: endDate.toISOString().slice(0, 10),
				id: Math.random(),
				startDate: startDate.toISOString().slice(0, 10)
			};

			dispatch(addTrip(formattedData));
			dispatch(setCurrentTrip(formattedData.id));
			reset();
			setShowForm(!showForm);
		}
	};

	return (
		<ReactModal
			style={{
				content: {
					height: '63%',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '5%',
					maxWidth: '550px',
				},
				overlay: {
					backgroundColor: 'rgba(0, 0, 0, 0.5)'
				}
			}}
			contentLabel="Add Trip Modal"
			isOpen={showForm}
			onRequestClose={toggleModal}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='modalHeader'>
					<h2>Create trip</h2>
					<button className='modalHeaderExitButton' onClick={() => setShowForm(false)} type="button">X</button>
				</div>

				<br />
				<div>
					{Object.keys(errors).map((key, index) => {
						const errorKey = key as 'destination' | 'endDate' | 'startDate';
						return <p key={index}>{errors[errorKey]?.message}</p>
					})}
				</div>

				<Controller
					render={({ field, fieldState }) => (
						<>
							<label className='blockElement' htmlFor="destination">{fieldState.invalid ? <span style={{ color: "red" }}>*</span> : ""} City</label>
							<select className='blockElement' id="destination" {...field}>
								<option value="">Please select a city</option>
								{cities.map((city, index) => (
									<option key={index} value={city}>{city}</option>
								))}
							</select>
						</>
					)}
					control={control}
					defaultValue=""
					name="destination"
				/>
				<Controller
					render={({ field, fieldState }) => (
						<>
							<label className='blockElement' htmlFor="startDate">{fieldState.invalid ? <span className='blockElement' style={{ color: "red" }}>*</span> : ""} Start date</label>
							<DatePicker
								autoComplete="off"
								dateFormat="yyyy-MM-dd"
								id="startDate"
								maxDate={maxDate}
								minDate={new Date()}
								onChange={date => field.onChange(date)}
								placeholderText="Select date"
								selected={field.value}
							/>
						</>
					)}
					control={control}
					defaultValue={null}
					name="startDate"
				/>

				<Controller
					render={({ field, fieldState }) => (
						<>
							<label className='blockElement' htmlFor="endDate">{fieldState.invalid ? <span className='blockElement' style={{ color: "red" }}>*</span> : ""} End date</label>
							<DatePicker
								autoComplete="off"
								dateFormat="yyyy-MM-dd"
								id="endDate"
								maxDate={maxDate}
								minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
								onChange={date => field.onChange(date)}
								placeholderText="Select date"
								selected={field.value}
							/>
						</>
					)}
					control={control}
					defaultValue={null}
					name="endDate"
				/>


				<div className='modalFooter'>
					<button className={'button'} onClick={toggleModal} type="button">Cancel</button>
					<button className={isValid ? 'blueButton' : 'button'} disabled={!isValid} type="submit">Save</button>
				</div>
			</form>
		</ReactModal >
	);
};

export default AddTripForm;

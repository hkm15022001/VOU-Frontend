import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomButton from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import { uploadEventImage } from '../../api';
import './eventEdit.scss';

function EventDetailsEdit({ onSave, onCancel, event }) {
    const [formData, setFormData] = useState({
        name: event.name || '',
        voucher_num: event.voucher_num || '',
        start_time: event.start_time ? new Date(event.start_time) : '',
        end_time: event.end_time ? new Date(event.end_time) : '',
        game_name: event.game_name || ''
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        // console.log(e.target)
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date, name) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imagePath = formData.images;

            if (file) {
                const response = await uploadEventImage(file);
                imagePath = response.data.data;
            }

            const updatedFormData = {
                ...formData,
                start_time: formData.start_time.toISOString(),
                end_time: formData.end_time.toISOString(),
                images: imagePath,
                voucher_num: parseInt(formData.voucher_num, 10),
            };

            await onSave(updatedFormData);
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    return (
        <div className="game-details-edit">
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    name="voucher_num"
                    label="Voucher Number"
                    type="number"
                    value={formData.voucher_num}
                    onChange={handleChange}
                />
                <div className="date-picker">
                    <label>Start Time</label>
                    <DatePicker
                        selected={formData.start_time}
                        onChange={(date) => handleDateChange(date, 'start_time')}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select start time"
                    />
                </div>
                <div className="date-picker">
                    <label>End Time</label>
                    <DatePicker
                        selected={formData.end_time}
                        onChange={(date) => handleDateChange(date, 'end_time')}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Select end time"
                    />
                </div>
                <div className="input-file">
                    <label htmlFor="images">Upload Image</label>
                    <input
                        type="file"
                        name="images"
                        id="images"
                        onChange={handleFileChange}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <CustomButton type="submit" content="Save" />
                    <CustomButton type="button" content="Cancel" onClickHandle={onCancel} />
                </div>
            </form>
        </div>
    );
}

export default EventDetailsEdit;

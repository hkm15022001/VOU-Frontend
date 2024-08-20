import React, { useState } from 'react';
import CustomButton from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import { uploadGameImage } from '../../api'; // Assuming this is the API call for uploading images

function GameDetailsEdit({ onSave, onCancel, game }) {
    const [formData, setFormData] = useState({
        name: game.name || '',
        type: game.type || '',
        exchange_allow: game.exchange_allow.toString() || '',
        tutorial: game.tutorial || '',
        images: game.images || '' // Assuming this holds the image path
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imagePath = formData.images;

            if (file) {
                const response = await uploadGameImage(file); 
                imagePath = response.data.data; 
            }
            
            
            const updatedFormData = {
                ...formData,
                images: imagePath,
                exchange_allow: formData["exchange_allow"] === true,
            };

            await onSave(updatedFormData);
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    return (
        <div className="game-details-edit">
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    key !== 'images' ? (
                        <Input
                            key={key}
                            name={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type={(key === 'exchange_allow') ? 'select' : 'text'}
                            value={formData[key]}
                            onChange={handleChange}
                            options={key === 'exchange_allow' ? [
                                { label: 'True', value: 'true' },
                                { label: 'False', value: 'false' },
                            ] : undefined}
                        />
                    ) : (
                        <div key={key} className="input-file">
                            <label htmlFor="images">{`Upload Image`}</label>
                            <input
                                type="file"
                                name="images"
                                id="images"
                                onChange={handleFileChange}
                            />
                        </div>
                    )
                ))}
                <div style={{ marginTop: 20 }}>
                    <CustomButton type="submit" content="Save" />
                    <CustomButton type="button" content="Cancel" onClickHandle={onCancel} />
                </div>
            </form>
        </div>
    );
}

export default GameDetailsEdit;

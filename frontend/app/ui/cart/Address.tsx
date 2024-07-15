import React from 'react';

interface AddressProps {
    address: string;
    name: string;
    postalCode: string;
}

const Address: React.FC<AddressProps> = ({ address, name, postalCode }) => {
    return (
        <div className="flex justify-between items-center border-b pb-4">
            <div>
                <p className="font-semibold">Deliver to: <span className="font-bold">{name}, {postalCode}</span></p>
                <p className="text-gray-600">{address}</p>
            </div>
            <button className="text-blue-800 font-semibold">CHANGE ADDRESS</button>
        </div>
    );
};

export default Address;

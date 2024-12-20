import React, { useContext, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { FileUploader } from 'react-drag-drop-files';
import { FrontEndPageContext } from '../FrontEndPageContext';
import { defaultUploadFileTypes } from './DefaultUploadFileTypes';
import Message from '../messaging/Message';

export default function DndSingleFileUploader (
    {
        name,
        fileUrl,
        fileTypes = defaultUploadFileTypes,
        handleChange,
        setImageData,
        maxSizeMb = 10,
    }: {
        name: string;
        fileUrl: string;
        fileTypes?: Array<string>;
        handleChange?: (file: File) => void;
        setImageData?: (data: string) => void;
        maxSizeMb?: number;
    },
) {
    const { apiFeUrl } = useContext(FrontEndPageContext);

    const [errorMsg, setErrorMsg] = useState('');

    const [errorMsgIsVisible, setErrorMsgIsVisible] = useState(false);

    let reader = null;

    if (setImageData) {
        reader = new FileReader();

        reader.onload = (e) => {
            setImageData(
                // @ts-expect-error TS2345
                e.target.result,
            );
        };
    }

    const errorHandler = (err: string) => {
        setErrorMsg(err);
        setErrorMsgIsVisible(true);
    };

    return (
        <div className="space-y-3">
            <Message
                type="error"
                isVisible={errorMsgIsVisible}
                setIsVisible={setErrorMsgIsVisible}
                heading={errorMsg}
            />
            <div>
                <FileUploader
                    handleChange={(file: File) => {
                        setErrorMsg('');
                        setErrorMsgIsVisible(false);

                        if (handleChange) {
                            handleChange(file);
                        }

                        if (reader) {
                            reader.readAsDataURL(file);
                        }
                    }}
                    name={name}
                    types={fileTypes}
                    maxSize={maxSizeMb}
                    onSizeError={errorHandler}
                    onTypeError={errorHandler}
                >
                    <div className="col-span-full">
                        <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-4 py-4">
                            <div className="text-center">
                                {(() => {
                                    if (fileUrl) {
                                        if (!fileUrl.startsWith('data:')) {
                                            fileUrl = `${apiFeUrl}${fileUrl}`;
                                        }

                                        return (
                                            <img
                                                src={fileUrl}
                                                alt=""
                                                className="h-24 mx-auto"
                                            />
                                        );
                                    }

                                    return (
                                        <PhotoIcon
                                            className="mx-auto h-24 w-24 text-gray-300"
                                            aria-hidden="true"
                                        />
                                    );
                                })()}
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 hover:text-cyan-700"
                                    >
                                        <span>Upload a file</span>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG or JPG up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </FileUploader>
            </div>
        </div>
    );
}

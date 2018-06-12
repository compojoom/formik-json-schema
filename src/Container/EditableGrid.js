import React, { Component } from 'react';
import { getIn } from 'formik';

import Element from '../Element';

const setNull = obj => Object.keys(obj).forEach(k => obj[k] = '');

const EditableGrid = ({ config, formikProps, fieldArrayName, arrayActions }) => {
    const { header, fields, buttons } = config;
    const { values, errors, touched } = formikProps;
    const { insert, remove, push } = arrayActions;

    const arrayFields = Object.assign({}, fields);
    setNull(arrayFields);

    const arrayValues = getIn(values, fieldArrayName);
    const hasValue = arrayValues && arrayValues.length > 0;

    return (
        <table className="table table-bordered flutter-table">
            <thead>
                <tr>
                    { Object.keys(header).map( (key) =>
                        <th key={ key }>{ header[key] }</th>
                    )}
                </tr>
            </thead>
            <tbody>
                { hasValue && arrayValues.map( (data, index) =>
                    <tr key={ index }>
                        { Object.keys(fields).map( (key) => {
                            let element = Object.assign({}, fields[key]);
                            element.name = `${fieldArrayName}.${index}.` + fields[key].name;

                            return (
                                <td key={ key }>
                                    <Element
                                        config={ element }
                                        formikProps={ formikProps } />
                                </td>
                            );
                        } ) }
                        { !! buttons.remove &&
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={ () => remove(index) }>{ buttons.remove }
                                </button>
                            </td>
                        }
                    </tr>
                ) }
            </tbody>
            <tfoot>
                <tr>
                    { !! buttons.add &&
                        <td>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={ () => push(arrayFields) }>{ buttons.add }
                            </button>
                        </td>
                    }
                </tr>
            </tfoot>
        </table>
    );
}

export default EditableGrid;
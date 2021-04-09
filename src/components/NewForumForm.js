import React from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { api } from '../services/api';

const NewForumForm = () => {
    return (
        <div>New Forum</div>
    );
};

export default NewForumForm;
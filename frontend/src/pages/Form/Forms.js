import { useContext, useEffect, useState, useReducer } from 'react';
import { FormSnippet, Line, NoDataPlaceholder, YesNoPopup } from '../../components/';
import { FormsContext } from '../../context/';
import styles from './Forms.module.css';
import { formMessageReducer, ACTION } from '../reducers/formMessageReducer';
import { useAuthContext } from '../../hooks/useAuthContext';

import activeFormImg from '../../assets/images/ezcoms_activeform_bg.png';
import addIcon from '../../assets/images/add_icon.png';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../layouts';
import PageContent from '../../layouts/page-container/PageContent';

const Forms = () => {
    const { forms, setForms } = useContext(FormsContext);
    const [selectedID, setSelectedID] = useState('');
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [state, dispatch] = useReducer(formMessageReducer, {});

    const { user } = useAuthContext();

    const fetchAllForms = async () => {
        if (!user) {
            return;
        }
        dispatch({ type: ACTION.LOADING });
        try {
            const response = await fetch('http://localhost:4000/api/forms/', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                setForms(json);
                console.log('forms in all forms pg: ', forms);
                dispatch({ type: ACTION.RESET });
            } else {
                throw new Error('Bad response fetching all forms.');
            }
        } catch (err) {
            dispatch({ type: ACTION.ERROR_GET_ALL });
        }
        setTimeout(() => {
            dispatch({ type: ACTION.RESET });
        }, 3000);
        setOpenDeletePopup(false);
        setInitLoading(false);
    };

    const handleOpenDeletePopup = (e, selectedID) => {
        e.preventDefault();
        setOpenDeletePopup(true);
        setSelectedID(selectedID);
    };

    const handleDelete = async (e) => {
        if (!user) {
            return;
        }
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/forms/' + selectedID, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                console.log('Form deleted!');
                await fetchAllForms();
                dispatch({ type: ACTION.SUCCESS_DELETE });
            } else {
                throw new Error('Bad response');
            }
        } catch (err) {
            dispatch({ type: ACTION.ERROR_DELETE });
        }

        setOpenDeletePopup(false);
    };

    useEffect(() => {
        if (user) {
            fetchAllForms();
        }
    }, [user]);

    return (
        <PageContainer>
            <PageContent>
                <div className="flex-col justify-content-start align-items-start w-100 ">
                    <h1 className="font-size-4 mart-4"> Forms </h1>
                    <Line />
                </div>
                {!initLoading && (!forms || forms.length === 0) && <NoDataPlaceholder message="You have no forms right now." src={activeFormImg} />}
                {state.errorMessage && <div className="errorMessage bg-light-red pad-3 radius-1">{state.errorMessage}</div>}
                {state.successMessage && <div className="successMessage bg-light-green pad-3 radius-1">{state.successMessage}</div>}
                {state.loadingMessage && <div className="loadingMessage pad-3">{state.loadingMessage}</div>}
                {forms && forms.length > 0 && <div className={`${styles.forms} w-100 h-100 gap-4 border-box bg-blue-500`}>
                    {openDeletePopup && (
                        <YesNoPopup yesFunction={handleDelete} closePopup={(e) => setOpenDeletePopup(false)}>
                            <h3>Are you sure?</h3>
                            <p>Are you sure you want to delete this form? This action cannot be undone.</p>
                        </YesNoPopup>
                    )}
                    {forms &&
                        forms.map((form) => {
                            return (
                                <div className={styles.formSnippet}>
                                    <FormSnippet formId={form._id} form={form} handleDelete={handleOpenDeletePopup} key={form._id} />
                                </div>
                            );
                        })}
                </div>}
                <div className={`${styles.formsButtons} flex-row pad-3 border-box`}>
                    {/* <button className='outline-button bg-transparent greyHoverButton pad-3 radius-4 font-size-2'>Create new form</button> */}
                    <Link to="/form-builder">
                        <img className={`icon-size bg-grey-50 soft-white-glow radius-4`} src={addIcon}></img>
                    </Link>
                </div>
            </PageContent>
        </PageContainer>
    );
};

export default Forms;

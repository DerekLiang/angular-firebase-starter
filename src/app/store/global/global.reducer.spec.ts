import { GlobalActions } from 'app/store/global/global.actions';
import { globalReducer } from 'app/store/global/global.reducer';
import { shouldNotAlterStateOnUnknownAction } from 'app/store/testing';

import { assignDeep } from '../../helpers';
import { AppState, defaultAppState } from '../app.state';
import { FormStates } from '../forms/formState';
import {
    UserAppState,
    initialUserState,
} from 'app/account/user/state/store.config';

describe('Global Reducer', () => {
    const reducer = globalReducer(state => state);

    let oldState: AppState;

    beforeEach(() => {
        oldState = assignDeep(defaultAppState);
    });

    shouldNotAlterStateOnUnknownAction(reducer);

    it(`Assigns missing properties to the state tree
        ON App Start
        using the default state`, () => {
        oldState.user.logIn = undefined;
        const newState = reducer(oldState, new GlobalActions.AppStart());

        expect(newState).toEqual(defaultAppState);
    });

    it(`Does not alter existing state properties
        IF they are part of the correct schema`, () => {
        oldState.user.logIn.failureMessage = 'Example';

        const newState = reducer(oldState, new GlobalActions.AppStart());

        expect(newState.user.logIn.failureMessage).toBe('Example');
    });
});

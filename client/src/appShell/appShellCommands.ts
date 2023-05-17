
import { profileLoaded } from "../features/profile/ProfileSlice";
import { Command } from "../redux/Command";
import { pageLoadingFailed, pageLoadingStarted, pageLoadingSucceeded } from "../redux/pageSlice";

export const loadAppShellDataCommand =
  (): Command =>
  async (dispatch, getState, { repositories }) => {
    // try {
    //   dispatch(pageLoadingStarted());
    //   const profile = await repositories.profileRepository.getProfile()

    //   dispatch(profileLoaded(profile));
    //   dispatch(pageLoadingSucceeded());
    // } catch (error: any) {
    //   dispatch(pageLoadingFailed(error));
    // }
  };

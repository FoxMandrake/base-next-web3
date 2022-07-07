// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { newFlatSubsocialApi, SubsocialSubstrateApi } from "@subsocial/api";
import { FlatSubsocialApi } from "@subsocial/api/flat-subsocial";
import { HttpRequestMethod } from "@subsocial/api/types";
import { subsocialConfig as inputConfig } from "../../config";

type ContextType = {
  api: FlatSubsocialApi;
  subsocialSubstrateApi: SubsocialSubstrateApi;
};
export const ApiContext = createContext<ContextType>({
  api: {} as FlatSubsocialApi,
  subsocialSubstrateApi: {} as SubsocialSubstrateApi,
});

const config = {
  substrateNodeUrl: inputConfig.substrateNodeUrl,
  offchainUrl: inputConfig.offchainUrl,
  ipfsNodeUrl: inputConfig.ipfsNodeUrl,
  useServer: {
    httpRequestMethod: "get" as HttpRequestMethod,
  },
};

export async function initSubsocialApi() {
  try {
    return await newFlatSubsocialApi(config);
  } catch (e) {
    console.log(e);
  }
}

type ApiProviderProps = {
  children: ReactNode;
};

export const SubsocialApiProvider = (props: ApiProviderProps) => {
  const [api, setApi] = useState<FlatSubsocialApi>({} as FlatSubsocialApi);
  const [subsocialSubstrateApi, setSubsocialSubstrateApi] =
    useState<SubsocialSubstrateApi>({} as SubsocialSubstrateApi);

  useEffect(() => {
    initSubsocialApi().then((res) => {
      setApi(res);
      const _subsocialSubstrateApi = new SubsocialSubstrateApi({
        api: res,
      });

      setSubsocialSubstrateApi(_subsocialSubstrateApi);
    });
  }, []);

  return !api.subsocial ? (
    <>{props.children}</>
  ) : (
    <ApiContext.Provider value={{ api, subsocialSubstrateApi }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export const useSubsocialApi = () => {
  return useContext(ApiContext);
};

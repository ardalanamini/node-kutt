const CONFIG: ConfigI = {
  api: "https://kutt.it/api/v2",
  key: "",
  timeout: 1e4, // 10 seconds by default
};

export default CONFIG;

export interface ConfigI {
  api: string;
  key: string;
  timeout: number;
}

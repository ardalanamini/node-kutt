const CONFIG: ConfigI = {
  api: "https://kutt.it/api/v2",
  key: "",

  // 10 seconds by default
  timeout: 1e4,
};

export default CONFIG;

export interface ConfigI {
  api: string;
  key: string;
  timeout: number;
}

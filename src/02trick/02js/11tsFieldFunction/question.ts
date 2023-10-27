namespace Question {
  type Watcher = {
    on(
      eventName: string,
      callback: (oldValue: any, newValue: any) => void
    ): void;
  };

  declare function watch(obj: Object): Watcher;

  const personWather = watch({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
  });

  personWather.on("ageChanged", (oldValue, newValue) => {});
}

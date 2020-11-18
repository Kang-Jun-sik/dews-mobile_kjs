const uuid = {
  create(): string {
    let d = new Date().getTime();
    // Time in microseconds since page-load or 0 if unsupported
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    const uid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uid;
  }
};

export { uuid };

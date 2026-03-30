export const getDate = () => new Date().toISOString().split("T")[0];

export const getNextDate = (dateStr: string) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

export const getPrevDate = (dateStr: string) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);

    return d.toISOString().split("T")[0];
  };
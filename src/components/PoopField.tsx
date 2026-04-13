import {
  SizeEnum,
  ColorEnum,
  SoftnessEnum,
  type PoopDTO,
} from "../types/PoopDto";

interface PoopFieldProps {
  poopDTO: PoopDTO;
  onChange: (data: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick: () => void;
}

const PoopField = ({ poopDTO, onChange, onClick }: PoopFieldProps) => {
  return (
    <div>
      {poopDTO ? (
        <fieldset>
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <legend className="text-xl font-semibold">
                How was your poop?
              </legend>
              <button className="btn-sm" type="button" onClick={onClick}>
                Unpoop
              </button>
            </div>

            <div>
              <label className="mx-2">Size</label>
              <select name="size" value={poopDTO?.size} onChange={onChange}>
                {Object.entries(SizeEnum).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <label className="mx-2">Color</label>
              <select name="color" value={poopDTO?.color} onChange={onChange}>
                {Object.entries(ColorEnum).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <label className="mx-2">Softness</label>
              <select
                name="softness"
                value={poopDTO?.softness}
                onChange={onChange}
              >
                {Object.entries(SoftnessEnum).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      ) : (
        <div className="flex gap-4">
          <h4 className="text-xl font-semibold">You haven't pooped yet...</h4>
          <button className="btn-sm" type="button" onClick={onClick}>
            Poop
          </button>
        </div>
      )}
    </div>
  );
};

export default PoopField;

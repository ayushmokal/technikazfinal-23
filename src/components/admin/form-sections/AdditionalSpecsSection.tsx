import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../ProductForm";

interface AdditionalSpecsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function AdditionalSpecsSection({ form, productType }: AdditionalSpecsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="battery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery</FormLabel>
              <FormControl>
                <Input placeholder="Enter battery specifications" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="os"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating System</FormLabel>
              <FormControl>
                <Input placeholder="Enter OS details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {productType === 'mobile' ? (
          <>
            <FormField
              control={form.control}
              name="camera"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camera Setup</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter camera specifications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="camera_details"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Camera Details (JSON)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"main": "48MP", "ultra_wide": "12MP", "telephoto": "10MP"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chipset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chipset</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter chipset details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter display resolution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="screen_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Screen Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter screen size" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charging_specs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charging Specifications</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter charging specifications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="graphics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graphics</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter graphics specifications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ports"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ports</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter available ports" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {/* JSON Specification Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Additional Specifications (JSON format)</h3>
        
        {productType === 'mobile' ? (
          <>
            <FormField
              control={form.control}
              name="multimedia_specs"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Multimedia Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"speakers": "Stereo speakers", "audio_jack": "Yes"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sensor_specs"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Sensor Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"fingerprint": "Under display", "face_recognition": "Yes"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="network_specs"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Network Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"5G": "Yes", "wifi": "Wi-Fi 6E"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="multimedia_specs"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Multimedia Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"speakers": "Stereo speakers", "webcam": "720p HD"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="connectivity_specs"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Connectivity Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder='{"wifi": "Wi-Fi 6E", "bluetooth": "5.2"}'
                      {...field}
                      value={value ? JSON.stringify(value, null, 2) : ''}
                      onChange={e => {
                        try {
                          const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                          onChange(jsonValue);
                        } catch (error) {
                          onChange(e.target.value);
                        }
                      }}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="design_specs"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Design Specifications</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder='{"dimensions": "164.3 x 75.4 x 8.9 mm", "weight": "228g"}'
                  {...field}
                  value={value ? JSON.stringify(value, null, 2) : ''}
                  onChange={e => {
                    try {
                      const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                      onChange(jsonValue);
                    } catch (error) {
                      onChange(e.target.value);
                    }
                  }}
                  className="h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="performance_specs"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Performance Specifications</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder='{"benchmark_score": "1200000", "gpu_score": "8500"}'
                  {...field}
                  value={value ? JSON.stringify(value, null, 2) : ''}
                  onChange={e => {
                    try {
                      const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                      onChange(jsonValue);
                    } catch (error) {
                      onChange(e.target.value);
                    }
                  }}
                  className="h-32"
                />
              </Control>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display_details"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Display Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder='{"brightness": "1500 nits", "refresh_rate": "120Hz"}'
                  {...field}
                  value={value ? JSON.stringify(value, null, 2) : ''}
                  onChange={e => {
                    try {
                      const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                      onChange(jsonValue);
                    } catch (error) {
                      onChange(e.target.value);
                    }
                  }}
                  className="h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {productType === 'mobile' && (
          <FormField
            control={form.control}
            name="general_specs"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>General Specifications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder='{"launch_date": "2024", "warranty": "1 year"}'
                    {...field}
                    value={value ? JSON.stringify(value, null, 2) : ''}
                    onChange={e => {
                      try {
                        const jsonValue = e.target.value ? JSON.parse(e.target.value) : null;
                        onChange(jsonValue);
                      } catch (error) {
                        onChange(e.target.value);
                      }
                    }}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}
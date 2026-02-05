import { useState } from "react";
import Button from "@/components/Button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/Card";
import { BookOpen, Info, AlertCircle, CheckCircle2 } from "lucide-react";

// Enums matching the DTO
enum CourseType {
  CORE = "core",
  ELECTIVE = "elective",
}

interface FormData {
  code: string;
  title: string;
  canonicalTitle: string;
  level: number | "";
  creditUnits: number | "";
  type: CourseType | "";
  semester: number | "";
  syllabus: string;
  isActive: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateCourseForm() {
  const [formData, setFormData] = useState<FormData>({
    code: "",
    title: "",
    canonicalTitle: "",
    level: "",
    creditUnits: "",
    type: "",
    semester: "",
    syllabus: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation function
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "code":
        if (!value || value.trim() === "") return "Course code is required";
        if (value.length > 20)
          return "Course code must be 20 characters or less";
        return "";

      case "title":
        if (!value || value.trim() === "") return "Course title is required";
        return "";

      case "level":
        if (value === "" || value === null) return "Level is required";
        const levelNum = Number(value);
        if (isNaN(levelNum)) return "Level must be a number";
        if (levelNum < 100 || levelNum > 500)
          return "Level must be between 100 and 500";
        return "";

      case "creditUnits":
        if (value === "" || value === null) return "Credit units is required";
        const creditNum = Number(value);
        if (isNaN(creditNum)) return "Credit units must be a number";
        if (creditNum < 1 || creditNum > 10)
          return "Credit units must be between 1 and 10";
        return "";

      case "syllabus":
        if (!value || value.trim() === "") return "Syllabus is required";
        return "";

      case "semester":
        if (value !== "" && value !== null) {
          const semNum = Number(value);
          if (isNaN(semNum)) return "Semester must be a number";
          if (semNum < 1 || semNum > 2) return "Semester must be 1 or 2";
        }
        return "";

      default:
        return "";
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    let processedValue: any = value;

    // Handle checkboxes
    if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    }

    // Handle number inputs
    if (name === "level" || name === "creditUnits" || name === "semester") {
      processedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle blur
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    newErrors.code = validateField("code", formData.code);
    newErrors.title = validateField("title", formData.title);
    newErrors.level = validateField("level", formData.level);
    newErrors.creditUnits = validateField("creditUnits", formData.creditUnits);
    newErrors.syllabus = validateField("syllabus", formData.syllabus);

    // Optional fields with validation rules
    if (formData.semester !== "") {
      newErrors.semester = validateField("semester", formData.semester);
    }

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission (remove empty optional fields)
      const submitData: any = {
        code: formData.code,
        title: formData.title,
        level: formData.level,
        creditUnits: formData.creditUnits,
        syllabus: formData.syllabus,
        isActive: formData.isActive,
      };

      if (formData.canonicalTitle)
        submitData.canonicalTitle = formData.canonicalTitle;
      if (formData.type) submitData.type = formData.type;
      if (formData.semester) submitData.semester = formData.semester;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Submitting course data:", submitData);

      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          code: "",
          title: "",
          canonicalTitle: "",
          level: "",
          creditUnits: "",
          type: "",
          semester: "",
          syllabus: "",
          isActive: true,
        });
        setTouched({});
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12 bg-surface">
      <div className="container max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="text-primary" size={24} />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl">
                  Create New Course
                </CardTitle>
                <p className="text-sm text-muted mt-1">
                  Add a new course to the academic catalog
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-info/10 border border-info/20 rounded-lg p-3 mt-4">
              <Info className="text-info flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-foreground">
                Fields marked with{" "}
                <span className="text-error font-semibold">*</span> are required
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Code & Level Row */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-semibold text-foreground mb-2">
                    Course Code <span className="text-error">*</span>
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="e.g., CSC 201"
                    value={formData.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={20}
                    className={`input-field w-full ${
                      touched.code && errors.code
                        ? "border-error focus:ring-error"
                        : touched.code && !errors.code
                          ? "border-success focus:ring-success"
                          : ""
                    }`}
                  />
                  {touched.code && errors.code && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertCircle
                        size={14}
                        className="text-error flex-shrink-0"
                      />
                      <p className="text-xs text-error">{errors.code}</p>
                    </div>
                  )}
                  {touched.code && !errors.code && formData.code && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <CheckCircle2
                        size={14}
                        className="text-success flex-shrink-0"
                      />
                      <p className="text-xs text-success">Valid course code</p>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-semibold text-foreground mb-2">
                    Level <span className="text-error">*</span>
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field w-full ${
                      touched.level && errors.level
                        ? "border-error focus:ring-error"
                        : touched.level && !errors.level
                          ? "border-success focus:ring-success"
                          : ""
                    }`}>
                    <option value="">Select level</option>
                    <option value={100}>100 Level</option>
                    <option value={200}>200 Level</option>
                    <option value={300}>300 Level</option>
                    <option value={400}>400 Level</option>
                    <option value={500}>500 Level</option>
                  </select>
                  {touched.level && errors.level && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertCircle
                        size={14}
                        className="text-error flex-shrink-0"
                      />
                      <p className="text-xs text-error">{errors.level}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-foreground mb-2">
                  Course Title <span className="text-error">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Data Structures and Algorithms"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field w-full ${
                    touched.title && errors.title
                      ? "border-error focus:ring-error"
                      : touched.title && !errors.title
                        ? "border-success focus:ring-success"
                        : ""
                  }`}
                />
                {touched.title && errors.title && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <AlertCircle
                      size={14}
                      className="text-error flex-shrink-0"
                    />
                    <p className="text-xs text-error">{errors.title}</p>
                  </div>
                )}
              </div>

              {/* Canonical Title (Optional) */}
              <div>
                <label
                  htmlFor="canonicalTitle"
                  className="block text-sm font-semibold text-foreground mb-2">
                  Canonical Title{" "}
                  <span className="text-muted text-xs font-normal">
                    (Optional)
                  </span>
                </label>
                <input
                  id="canonicalTitle"
                  name="canonicalTitle"
                  type="text"
                  placeholder="Normalized course title"
                  value={formData.canonicalTitle}
                  onChange={handleChange}
                  className="input-field w-full"
                />
                <p className="text-xs text-muted mt-1.5">
                  A standardized version of the course title for consistency
                </p>
              </div>

              {/* Credit Units & Semester Row */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label
                    htmlFor="creditUnits"
                    className="block text-sm font-semibold text-foreground mb-2">
                    Credit Units <span className="text-error">*</span>
                  </label>
                  <input
                    id="creditUnits"
                    name="creditUnits"
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1-10"
                    value={formData.creditUnits}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field w-full ${
                      touched.creditUnits && errors.creditUnits
                        ? "border-error focus:ring-error"
                        : touched.creditUnits && !errors.creditUnits
                          ? "border-success focus:ring-success"
                          : ""
                    }`}
                  />
                  {touched.creditUnits && errors.creditUnits && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertCircle
                        size={14}
                        className="text-error flex-shrink-0"
                      />
                      <p className="text-xs text-error">{errors.creditUnits}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-semibold text-foreground mb-2">
                    Semester{" "}
                    <span className="text-muted text-xs font-normal">
                      (Optional)
                    </span>
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field w-full ${
                      touched.semester && errors.semester
                        ? "border-error focus:ring-error"
                        : ""
                    }`}>
                    <option value="">Select semester</option>
                    <option value={1}>First Semester</option>
                    <option value={2}>Second Semester</option>
                  </select>
                  {touched.semester && errors.semester && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertCircle
                        size={14}
                        className="text-error flex-shrink-0"
                      />
                      <p className="text-xs text-error">{errors.semester}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-foreground mb-2">
                  Course Type{" "}
                  <span className="text-muted text-xs font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: CourseType.CORE,
                      }))
                    }
                    className={`h-11 rounded-lg border-2 font-semibold transition-all ${
                      formData.type === CourseType.CORE
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-surface hover:border-primary/50"
                    }`}>
                    Core Course
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: CourseType.ELECTIVE,
                      }))
                    }
                    className={`h-11 rounded-lg border-2 font-semibold transition-all ${
                      formData.type === CourseType.ELECTIVE
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-surface hover:border-primary/50"
                    }`}>
                    Elective
                  </button>
                </div>
              </div>

              {/* Syllabus */}
              <div>
                <label
                  htmlFor="syllabus"
                  className="block text-sm font-semibold text-foreground mb-2">
                  Syllabus <span className="text-error">*</span>
                </label>
                <textarea
                  id="syllabus"
                  name="syllabus"
                  rows={6}
                  placeholder="Enter course syllabus, objectives, and key topics..."
                  value={formData.syllabus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field w-full resize-none ${
                    touched.syllabus && errors.syllabus
                      ? "border-error focus:ring-error"
                      : touched.syllabus && !errors.syllabus
                        ? "border-success focus:ring-success"
                        : ""
                  }`}
                />
                {touched.syllabus && errors.syllabus && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <AlertCircle
                      size={14}
                      className="text-error flex-shrink-0"
                    />
                    <p className="text-xs text-error">{errors.syllabus}</p>
                  </div>
                )}
              </div>

              {/* Is Active Toggle */}
              <div className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <label htmlFor="isActive" className="flex-1 cursor-pointer">
                  <span className="block text-sm font-semibold text-foreground">
                    Course is Active
                  </span>
                  <span className="block text-xs text-muted mt-0.5">
                    Active courses will be visible to students and available for
                    enrollment
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="flex-1 sm:flex-initial sm:min-w-[160px]">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle2 size={18} className="mr-2" />
                      Created!
                    </>
                  ) : (
                    "Create Course"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setFormData({
                      code: "",
                      title: "",
                      canonicalTitle: "",
                      level: "",
                      creditUnits: "",
                      type: "",
                      semester: "",
                      syllabus: "",
                      isActive: true,
                    });
                    setTouched({});
                    setErrors({});
                  }}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial">
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

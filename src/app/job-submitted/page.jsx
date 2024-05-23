import FancyText from "@/components/shared/FancyText";

export default function page() {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold mt-5 text-neutral-900">
        Job Sub<FancyText className={'px-1.5 py-0 mx-0'}>mitt</FancyText>ed
      </h1>

      <p className=" mt-2 text-muted-foreground text-center">
      Your job posting has been submitted and is pending approval.
      </p>
    </div>
  );
}

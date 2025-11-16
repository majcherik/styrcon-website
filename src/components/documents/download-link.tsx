interface DownloadLinkProps {
  fileName: string;
  downloadUrl: string;
}

export function DownloadLink({ fileName, downloadUrl }: DownloadLinkProps) {
  return (
    <a
      href={downloadUrl}
      className="font-medium text-primary hover:text-primary/80 transition-colors"
      download
    >
      Stiahnuť
    </a>
  );
}
